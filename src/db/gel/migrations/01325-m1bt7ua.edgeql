CREATE MIGRATION m1bt7uapx6nrfdb5slqs6he5s5qgp7hvirv6l6yautcxrkf5h3bqjq
    ONTO m1oj4xujw7lotpkn42gehef7dujrbu3qiifxc4gwivouoal2ugns3q
{
  ALTER TYPE sys_core::SysCode {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_code'));
      };
  };
  ALTER TYPE sys_rep::SysAnalytic {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_analytic'));
      };
  };
  ALTER TYPE sys_rep::SysRep {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_sys_report'));
      };
  };
};
