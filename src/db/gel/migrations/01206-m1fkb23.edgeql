CREATE MIGRATION m1fkb23jg4wgajlbqwxbdggmmxr5ura7cwkofdyuh6ap3lsnc6jigq
    ONTO m1bulr2wvhidnp27hfv7rgdykdpgciz26pwf5mkobc56cwzsu5xpma
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER LINK codeFunction {
          RENAME TO codeQueryFunction;
      };
  };
};
