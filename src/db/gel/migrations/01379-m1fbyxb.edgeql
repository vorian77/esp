CREATE MIGRATION m1fbyxbsa5uw2w4exwf7b7prni23btggjoqc35blucbhuda7grc33a
    ONTO m1t3p5gv5ryidyqeexnerjnd3t6r3u3tlye4d26ppgqy23r4bahbqa
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      CREATE LINK objAttrCmProgram: app_cm::CmProgram;
  };
  CREATE TYPE app_cm::CmSite EXTENDING sys_core::SysObjAttrEnt {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_cm_site'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE app_cm::CmClientServiceFlow {
      CREATE LINK objAttrCmSite: app_cm::CmSite;
  };
};
