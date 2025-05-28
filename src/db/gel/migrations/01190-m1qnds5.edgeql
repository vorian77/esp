CREATE MIGRATION m1qnds5bbcrtnde6zdlbccj62dmlm6o4yvh3tsub3jntwkmudy5bta
    ONTO m14x25yk4wpi5c6thw77ebf5spw6r3vgzg7kmy4lcvb7oboqrs4baq
{
  CREATE FUNCTION sys_rep::getReport(name: std::str) -> OPTIONAL sys_rep::SysRep USING (SELECT
      std::assert_single((SELECT
          sys_rep::SysRep
      FILTER
          (.name = name)
      ))
  );
  CREATE FUNCTION sys_user::getUserAction(name: std::str) -> OPTIONAL sys_user::SysUserAction USING (SELECT
      std::assert_single((SELECT
          sys_user::SysUserAction
      FILTER
          (.name = name)
      ))
  );
};
