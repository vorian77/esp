CREATE MIGRATION m14zsapnnmgdtoc33m5j54bqye2fajsgphzb4anu5jseishl2ytwhq
    ONTO m1rntjo3l6aymar4fuf4i3sgfjsg3yxxipwsiwasxn6tgycyludofa
{
  ALTER TYPE sys_user::SysUserTypeResource {
      ALTER LINK resource {
          ON SOURCE DELETE ALLOW;
      };
  };
};
