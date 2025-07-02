CREATE MIGRATION m1daocwwlrxlsmq5rkkyunilmnpncpvyxpi3p4fad27efnyym3zjza
    ONTO m14s7fasmt5fzdhzv5fccgv4cxnetzmuotfej2l3mdngduu7ak3i4q
{
  ALTER TYPE sys_user::SysUserType {
      CREATE LINK ownerNew: sys_core::SysOrg;
  };
};
