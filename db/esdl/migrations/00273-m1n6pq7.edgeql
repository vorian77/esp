CREATE MIGRATION m1n6pq7sbcyygevzqvetebvsrsatooschermewiezn4vaoa7owmxaa
    ONTO m1c4cjkbegnnw4koajndsmjjky3hldjqutwg6cqn4xeu2jsjr7fsxa
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK linkColumns;
  };
};
