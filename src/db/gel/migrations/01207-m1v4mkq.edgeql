CREATE MIGRATION m1v4mkqyalguj5s6e3op7rywa4chriytmraypyg6ny2nmmbztn3uaq
    ONTO m1fkb23jg4wgajlbqwxbdggmmxr5ura7cwkofdyuh6ap3lsnc6jigq
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      CREATE REQUIRED LINK codeQueryPlatform: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
