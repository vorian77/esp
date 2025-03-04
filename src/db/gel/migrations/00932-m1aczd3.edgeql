CREATE MIGRATION m1aczd33njobv2t3z5tvv2pazk2y5nucrlsg76ipg4isu6wqang6ha
    ONTO m1eopfdysrxgxkrasxlrhdbaui6usjhhygcqfx7p4ot4vrqfbcffga
{
  ALTER TYPE sys_core::ObjRoot {
      ALTER LINK attributes {
          ON TARGET DELETE ALLOW;
      };
  };
};
