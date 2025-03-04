CREATE MIGRATION m1rntjo3l6aymar4fuf4i3sgfjsg3yxxipwsiwasxn6tgycyludofa
    ONTO m1xacg7jukwp42tcw7jrb767ik6inzcy3pj3slmt6n77xitdvcdmvq
{
              ALTER TYPE sys_user::SysUserTypeResource {
      ALTER LINK resource {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
  };
};
