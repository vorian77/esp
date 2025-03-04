CREATE MIGRATION m132lhn25bkjqxanq66h3f2fm7jk4iuphkth3myq3r4nnwnu3mayca
    ONTO m1cpbpld5gsks4xe2shzh3nci4mrohi7si7l74xcpftwq5kay2heua
{
              ALTER TYPE sys_user::SysUser {
      DROP LINK prefs;
  };
  DROP TYPE sys_user::SysUserPref;
};
