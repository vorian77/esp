CREATE MIGRATION m1gfwex2a2b5t2mqrwbkx6jrbpjwosrh2dlhwidhjeflvknwtwvwgq
    ONTO m15qkkyozq376dgck5dqobikvquqjcaqc5td2ql74ztktjz7oipadq
{
  CREATE FUNCTION sys_core::getOrg(name: std::str) -> OPTIONAL sys_core::SysOrg USING (SELECT
      std::assert_single((SELECT
          sys_core::SysOrg
      FILTER
          (.name = name)
      ))
  );
};
