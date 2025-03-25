CREATE MIGRATION m1uxvmhcwimxlbo3u6h6duk2caqv2r7yprdw2c3gycb3trrr5paeza
    ONTO m1q26u7o2ftmuojmlnwealwevc7lsc3qkpwsqo4nyoijeztmoip5kq
{
  ALTER TYPE sys_core::SysAttrAccess {
      CREATE LINK attr: sys_core::SysAttr;
  };
  ALTER TYPE sys_core::SysAttrAccess {
      DROP LINK attrs;
  };
  ALTER TYPE sys_core::SysAttrAccess {
      CREATE LINK codeAttrType: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysAttrAccess {
      DROP LINK codeAttrTypes;
  };
};
