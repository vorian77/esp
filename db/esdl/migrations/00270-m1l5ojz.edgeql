CREATE MIGRATION m1l5ojzrtjiwxouwov5jnmtn6ozv4bogiw4j7g4sukxswhsx4jfvhq
    ONTO m1poajkcy5ybqxayrmtiasi6v4vlfzaiwrlhgk2mggsfuow2dqpq4q
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE MULTI LINK linkColumns: sys_db::SysColumn;
  };
};
