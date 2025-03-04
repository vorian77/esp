CREATE MIGRATION m1yp5vh22jzv4tjekihvcxh2tywcmbrf5zzlg5slrveilei33csmjq
    ONTO m1s73tedyoeaxzqoweefmysnmb5ey64duzrb4ga7hr35lujhoo42xa
{
          ALTER TYPE sys_user::SysUser {
      ALTER LINK person {
          SET REQUIRED USING (<default::SysPerson>{});
      };
  };
};
