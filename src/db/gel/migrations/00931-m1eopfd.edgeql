CREATE MIGRATION m1eopfdysrxgxkrasxlrhdbaui6usjhhygcqfx7p4ot4vrqfbcffga
    ONTO m1aiosoolc3e3pu2nyzfumo3r66ricfx65yowd4ocayfhseawwqr6q
{
  ALTER TYPE sys_core::ObjRoot {
      ALTER LINK attributes {
          ON SOURCE DELETE DELETE TARGET;
          RESET ON TARGET DELETE;
      };
  };
};
