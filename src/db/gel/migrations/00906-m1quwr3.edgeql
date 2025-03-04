CREATE MIGRATION m1quwr3liuevjm7npdf2phkiiqulazmzbajvjahvtzyxp7yzfl3vyq
    ONTO m1qrivhuqcl5cu4hu4vjsdpkevv2grzsqvgpuzzpkvyb2rujxqrciq
{
  ALTER TYPE sys_user::SysTask {
      DROP PROPERTY btnStyle;
  };
};
