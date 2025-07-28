CREATE MIGRATION m1iskz4vr2rfdti6zubp5sqnew3pgg73uhezs3xgjfucilyfj3igaq
    ONTO m1y7jjhd3ayo3bza42kqupm4z3qrbuxemzrccfoauo4jzoqcw5bzpq
{
  ALTER TYPE sys_user::SysUserType {
      CREATE LINK selfSignupSystem: sys_core::SysSystem;
  };
};
