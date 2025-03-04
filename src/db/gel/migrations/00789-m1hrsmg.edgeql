CREATE MIGRATION m1hrsmg2tlmqdbebfqzoskvssbbftn2qydroygg6bnizauhp4oioxq
    ONTO m1oddybokwursot6jehjqgcckb6styc44kn4r3xurtmqwifxfsxfrq
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE MULTI LINK propsNew: sys_core::SysDataObjFieldListItemsProp {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
