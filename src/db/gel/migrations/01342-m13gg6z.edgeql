CREATE MIGRATION m13gg6znayu2lbfou7tq2vq3hom3qcini7wrpzp3n7azrbqiokh2ka
    ONTO m14ijxnumeoidfb7qurz6o5a3ykbeb4wgs6cf5hg3gwdywmvid5poa
{
  ALTER TYPE sys_user::SysUserType {
      CREATE LINK users := (.<userTypes[IS sys_user::SysUser]);
  };
};
