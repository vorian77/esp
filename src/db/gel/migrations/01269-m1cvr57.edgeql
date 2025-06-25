CREATE MIGRATION m1cvr573n6sk6svvbc7nmdq3fvrkjftbwr2y3osoibttqg3klttdga
    ONTO m1febqxmcommiomgs3w3t4pyqi5dliwdtu3kjegxgiv642qju3wyja
{
  ALTER TYPE sys_core::SysNodeObj {
      CREATE LINK codeQueryType: sys_core::SysCode;
      CREATE LINK codeRenderPlatform: sys_core::SysCode;
  };
};
