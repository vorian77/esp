CREATE MIGRATION m1p23gibmvt4imjijlbigxjvtzntntk7wibfmyrcxoezrycoqzhkga
    ONTO m13ty7fwdmbt65glsatwi2d6atq24hfl54f2tk2rmwhjppjf5yjwqq
{
  ALTER TYPE app_crm::CrmClient {
      CREATE LINK owner: sys_core::SysSystem {
          SET REQUIRED USING (<sys_core::SysSystem>{});
      };
      CREATE PROPERTY name: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      DROP EXTENDING sys_user::Mgmt;
      EXTENDING sys_core::SysObjEnt LAST;
      ALTER PROPERTY email {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE app_crm::CrmClient {
      ALTER LINK owner {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY name {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
