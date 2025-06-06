CREATE MIGRATION m1nlixjdibs5hmttnv22iky6fhqscmmek5oflnacpzgy2plj4bxrxa
    ONTO m1coe242qsq5pkxci4rzscyezgjbi5n2lmy2qsb5u4aivihuut3voq
{
  ALTER TYPE sys_user::SysUserActionShow {
      CREATE REQUIRED PROPERTY isNot: std::bool {
          SET REQUIRED USING (<std::bool>{false});
      };
  };
};
