CREATE MIGRATION m1u5spxw4nuwrpmv2qd7p3gyxpzfhv6ehap5qozvuxokx5cfb2olra
    ONTO m1xo6uj7vbqf4yfvpkm2toidb4f2udaxwhjoyvtyn6vrd27smfjbka
{
  ALTER TYPE sys_user::SysUser {
      CREATE LINK person: default::SysPerson {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
      CREATE PROPERTY userName: std::str;
  };
};
