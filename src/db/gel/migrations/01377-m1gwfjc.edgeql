CREATE MIGRATION m1gwfjc72zh2upjotb7tlgmvqqocrq2g3jg4xxwurawyu4jpm6kfjq
    ONTO m16wadmhxv2cxrdhlrkhkhlg3yxuos2wqvsiypic7crfyksa7h5noa
{
  ALTER TYPE app_cm::CmProgram {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::SysObjAttrEnt LAST;
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_cm_program'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
