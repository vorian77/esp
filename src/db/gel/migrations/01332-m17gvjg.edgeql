CREATE MIGRATION m17gvjgynbbyodwhbwm3nnayouizclutdnex32nvpwjgh7ehp62qra
    ONTO m1nztlx4dp4cbyfqfhhukstv25o37abpt44vclx3zi35ocw5qkuusa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customColFile: std::json;
  };
  ALTER TYPE sys_rep::SysAnalytic {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_rep_analytic'));
      };
  };
};
