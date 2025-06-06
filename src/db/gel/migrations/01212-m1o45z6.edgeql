CREATE MIGRATION m1o45z6tglx73ssh4cfckaamw7alurckr37rqf4dgjmnkjdxypkdra
    ONTO m1ojsxef25gjyg5jch2ihpjuvg4hlytv3z4wulux7irby6wprr2qga
{
  ALTER TYPE sys_user::SysUserAction {
      CREATE PROPERTY exprActionConfirm: std::str;
      CREATE PROPERTY exprActionShows: std::str;
  };
};
