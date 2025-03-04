CREATE MIGRATION m1kddlvd5oev5y2iqk2yd5rzu7dsj2plsgldkawrzn2tch76flzakq
    ONTO m1ooynv2h7xqbe7cdbtskpcjvpnw77wrkc3gxf6rxfeqxi5yxjzt3a
{
              DROP FUNCTION sys_core::getSystemPrime(nameOwnerAndSystem: std::str);
  ALTER FUNCTION sys_user::getRootUser() USING (SELECT
      std::assert_single((SELECT
          sys_user::SysUser
      FILTER
          (.userName = '*ROOTUSER*')
      ))
  );
};
