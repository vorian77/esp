CREATE MIGRATION m1bcdf6bcbsxhhpgp4qrrpi2tvkp7zvuwbq2dd7bve4fd2lpv6phlq
    ONTO m1kt22vn7c2aoqdaa4kmdyllyk47wvxswifvhztfny3rqpmjcsoqyq
{
                              ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK actionsQuery: sys_core::SysDataObjActionQuery {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
