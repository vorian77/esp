CREATE MIGRATION m1o76vbtm36l2u5tcdpt5v2sunzlan5yiyeg3qxzfeosacq7h7e4xa
    ONTO m1osqlx733ay4jhfrvvqchcamvga45p3vxctzburulbrgimuxgiasa
{
  ALTER TYPE sys_core::SysSystem {
      CREATE MULTI LINK typesAttribute: sys_core::SysCode;
      CREATE MULTI LINK typesCodeType: sys_core::SysCodeType;
  };
};
