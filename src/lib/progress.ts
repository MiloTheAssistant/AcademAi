import { getSql } from "@/lib/db";

export type ProgressMap = Record<string, number[]>;

export async function getCompletedModules(
  userId: string,
  courseSlug?: string,
): Promise<ProgressMap> {
  const sql = getSql();
  const rows = courseSlug
    ? await sql`
        select course_slug, module_index
        from lesson_progress
        where user_id = ${userId}
          and course_slug = ${courseSlug}
        order by course_slug, module_index
      `
    : await sql`
        select course_slug, module_index
        from lesson_progress
        where user_id = ${userId}
        order by course_slug, module_index
      `;

  return rows.reduce<ProgressMap>((map, row) => {
    const slug = String(row.course_slug);
    const moduleIndex = Number(row.module_index);
    map[slug] = [...(map[slug] ?? []), moduleIndex];
    return map;
  }, {});
}

export async function setModuleComplete({
  userId,
  courseSlug,
  moduleIndex,
  completed,
}: {
  userId: string;
  courseSlug: string;
  moduleIndex: number;
  completed: boolean;
}): Promise<void> {
  const sql = getSql();
  if (completed) {
    await sql`
      insert into lesson_progress (user_id, course_slug, module_index)
      values (${userId}, ${courseSlug}, ${moduleIndex})
      on conflict (user_id, course_slug, module_index)
      do update set completed_at = now()
    `;
    return;
  }

  await sql`
    delete from lesson_progress
    where user_id = ${userId}
      and course_slug = ${courseSlug}
      and module_index = ${moduleIndex}
  `;
}

export async function resetCourseProgress(userId: string, courseSlug: string): Promise<void> {
  const sql = getSql();
  await sql`
    delete from lesson_progress
    where user_id = ${userId}
      and course_slug = ${courseSlug}
  `;
}
