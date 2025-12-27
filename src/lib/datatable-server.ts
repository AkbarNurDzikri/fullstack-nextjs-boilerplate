"use server";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";
import { verifyPermission } from "./rbac";
import { PermissionName } from "@/config/permissions";

function buildWhereClause(searchField: string, searchValue: string) {
  const parts = searchField.split(".");
  const root: any = {};
  let current = root;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === parts.length - 1) {
      current[part] = { contains: searchValue, mode: "insensitive" };
    } else {
      current[part] = {};
      current = current[part];
    }
  }
  return root;
}

export interface DataTableParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  searchField?: string;
}

export type PrismaModelName = Uncapitalize<Prisma.ModelName>;

// Define searchable fields for each model
const SEARCHABLE_FIELDS: Record<PrismaModelName, string[]> = {
  user: ["name", "email"],
  role: ["name", "description", "users.some.user.email"],
  permission: ["name", "description"],
  userRole: [],
  rolePermission: [],
  verificationToken: ["email"],
  passwordResetToken: ["email"],
};

// Define default includes for each model (e.g. relations or counts needed for display)
const INCLUDE_CONFIG: Partial<Record<PrismaModelName, any>> = {
  user: {
    _count: {
      select: { roles: true },
    },
  },
};

export async function getPaginatedData<T extends PrismaModelName>(
  model: T,
  params: DataTableParams
) {
  console.log(`[DataTableServer] Fetching data for model: ${model}`);
  const requiredPermission = `${model}:read` as PermissionName;
  const hasPerm = await verifyPermission(requiredPermission);
  console.log(`[DataTableServer] hasPerm for ${model}: ${hasPerm}`);

  if (!hasPerm) {
    console.error(`[DataTableServer] Permission denied for ${model}`);
    throw new Error(`Forbidden: You do not have permission to read ${model}`);
  }
  const { page = 1, pageSize = 10, sortBy, sortOrder = "asc", search } = params;

  const skip = (page - 1) * pageSize;

  const where: any = {};

  if (search) {
    const searchFields = SEARCHABLE_FIELDS[model] || [];
    if (searchFields.length > 0) {
      where.OR = searchFields.map((field) => buildWhereClause(field, search));
    }
  }

  // We use any here because Prisma's dynamic model access is notoriously hard to type perfectly
  // without complex mapped types, but we constrain the 'model' parameter to valid names.
  const delegate = (prisma as any)[model];

  const orderBy = sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" };

  // Advanced include/select logic for specifically enriched models
  const queryOptions: any = {
    where,
    orderBy,
    take: pageSize,
    skip,
  };

  if (INCLUDE_CONFIG[model]) {
    queryOptions.include = INCLUDE_CONFIG[model];
  }

  try {
    const [data, total] = await Promise.all([
      delegate.findMany(queryOptions),
      delegate.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  } catch (error: any) {
    // If createdAt sorting fails (e.g. model doesn't have it yet), try without default sorting
    if (!sortBy && error.message?.includes("createdAt")) {
      const [data, total] = await Promise.all([
        delegate.findMany({ ...queryOptions, orderBy: undefined }),
        delegate.count({ where }),
      ]);
      return {
        data,
        meta: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    }
    throw error;
  }
}

export async function deleteData<T extends PrismaModelName>(
  model: T,
  id: string
) {
  const requiredPermission = `${model}:delete` as PermissionName;
  const hasPerm = await verifyPermission(requiredPermission);

  if (!hasPerm) {
    return {
      error: `Forbidden: You do not have permission to delete ${model}`,
    };
  }

  try {
    const delegate = (prisma as any)[model];
    await delegate.delete({
      where: { id },
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || `Failed to delete ${model}` };
  }
}
