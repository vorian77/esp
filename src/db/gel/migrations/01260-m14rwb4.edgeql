CREATE MIGRATION m14rwb442y42qvku4j3do55bznd46ydensa2j5c6rpfz4xwirodl7a
    ONTO m13mynkreqrbg646rn7hfa46hsx3hpoftronta5skmx2hxngrkwi4a
{
  ALTER TYPE sys_user::SysUserParm {
      DROP CONSTRAINT std::exclusive ON ((.user, .idFeature));
  };
  ALTER TYPE sys_user::SysUserParm {
      CREATE CONSTRAINT std::exclusive ON ((.user, .idFeature, .codeType));
  };
};
