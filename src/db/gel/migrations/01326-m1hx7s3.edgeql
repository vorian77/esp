CREATE MIGRATION m1hx7s3hoyuza6nhf72s44i6ccwylychisbnascouwy2s2czys5a5a
    ONTO m1bt7uapx6nrfdb5slqs6he5s5qgp7hvirv6l6yautcxrkf5h3bqjq
{
  ALTER TYPE app_cm::CmPartner {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_cm_partner'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE app_crm::CrmClient {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_crm_client'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE sys_user::SysTask {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_task'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
  ALTER TYPE sys_user::SysUserAction {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_user_action'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
