CREATE MIGRATION m12wayldiukq4pl2goiody3oa5dafsbsi3z5zqb7l4c2fqijdipsbq
    ONTO m14sykmzp6xo2mghvlxxwnm6yawiwfpjlpegi2473n3aelgjko3i2a
{
          ALTER TYPE sys_user::SysTask {
      ALTER PROPERTY isAlwaysPinToDash {
          RENAME TO isPinToDash;
      };
  };
};
