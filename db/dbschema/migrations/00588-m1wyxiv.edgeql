CREATE MIGRATION m1wyxivzx5ifilvpukocue2oxjfzhs6x6ekxzcemqsrsuwgrlpt65q
    ONTO m1gh6ixebgxxwlc4pg3lbxqff3jrth6potgu76ognlwh7qi2n6eaja
{
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK codeUserTypeTags {
          RENAME TO tags;
      };
  };
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK userTypeResources {
          RENAME TO resources;
      };
  };
};
