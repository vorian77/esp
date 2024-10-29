CREATE MIGRATION m1ucogndxywflzpzec2dpwvduhahpi2nvd66jk2ojyroybxc7scyfq
    ONTO m12snej6wprhe2l3ni7zalm3t5bnz5wgxprkzgou7af2gqlpfpensq
{
  ALTER TYPE sys_user::SysUserType {
      CREATE PROPERTY isSelfSignup: std::bool;
  };
};
