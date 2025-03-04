CREATE MIGRATION m1csgz2y2gorc53mt7knkzlnpaa3ybqjssnpdzcyocftiupmst4i6a
    ONTO m1qorrbrv7mkfhg6y7rrcozdfwtr7pv6tnbt7i6dpcrgwm5fo2z4fq
{
  ALTER TYPE sys_user::SysUserType {
      CREATE MULTI LINK resources: sys_user::SysUserTypeResource;
  };
};
