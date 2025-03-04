CREATE MIGRATION m1xacg7jukwp42tcw7jrb767ik6inzcy3pj3slmt6n77xitdvcdmvq
    ONTO m1vetza7uijc26kput6tw56cnrx2xbaa67fzr3gzcoiq64bws4t3sq
{
              ALTER TYPE sys_user::SysUserTypeResource {
      DROP PROPERTY test;
  };
};
