CREATE MIGRATION m1ojsxef25gjyg5jch2ihpjuvg4hlytv3z4wulux7irby6wprr2qga
    ONTO m1nlixjdibs5hmttnv22iky6fhqscmmek5oflnacpzgy2plj4bxrxa
{
  ALTER TYPE sys_user::SysUserActionConfirm {
      CREATE REQUIRED PROPERTY isNot: std::bool {
          SET REQUIRED USING (<std::bool>{false});
      };
  };
};
