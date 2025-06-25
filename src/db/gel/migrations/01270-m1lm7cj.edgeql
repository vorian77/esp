CREATE MIGRATION m1lm7cjrmqsmtokp7kaaxs7aiq237epojo6uq7g3tovs742q673jaa
    ONTO m1cvr573n6sk6svvbc7nmdq3fvrkjftbwr2y3osoibttqg3klttdga
{
  ALTER TYPE sys_user::SysTask {
      DROP LINK targetDataObj;
  };
};
