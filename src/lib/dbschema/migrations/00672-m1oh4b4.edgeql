CREATE MIGRATION m1oh4b4hmgypo3txib2wvlhfbqmeqmrprparo472dvtsruwlujitla
    ONTO m13vfannmk5kqfbwfbritunufb2gdrtzme6ddfh5tj5b5btbdzhadq
{
  ALTER TYPE sys_user::SysUserTypeResourceSubject RENAME TO sys_user::SysUserTypeResource;
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK resources_subject {
          RENAME TO resources;
      };
  };
};
