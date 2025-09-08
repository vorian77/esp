CREATE MIGRATION m1nlmhkccmbiea6aasdttyr5qvsilmfsfhlfguybqdyuwhbzqkkmgq
    ONTO m1kl7xou66mcvnnslwtsd2kaj7mn25jz2tzscmgfrpvuija7brr6mq
{
  ALTER TYPE app_cm::CmPartner {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_app_cm_partner'));
      };
  };
  ALTER TYPE app_cm::CmProgram {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_app_cm_program'));
      };
  };
  ALTER TYPE app_cm::CmSite {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_app_cm_site'));
      };
  };
  ALTER TYPE app_crm::CrmClient {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_app_crm_client'));
      };
  };
};
