CREATE MIGRATION m1fz75ors4ojuliqnhdwsxvfjl67gfnhmi456gxsbvxzv34qfzofia
    ONTO m1r6lcitxsf3ofim6jjilhz7bgd6vl7mkh4gp3irgygkrb5mp3gy3a
{
  ALTER TYPE sys_api::SysApiTable {
      CREATE PROPERTY file: std::json;
  };
};
