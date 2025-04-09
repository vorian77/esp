CREATE MIGRATION m1oywru7m6ra3yyurjnlfd2mzdrzatjtngf2ptdzrfnrkg46gsh46a
    ONTO m1clzmu6x5qnn4a27uh3weo6oxjlb2t4exd6qdl66mc6cjywiytiya
{
  ALTER TYPE sys_core::ObjRoot {
      ALTER LINK attrs {
          RESET ON SOURCE DELETE;
      };
  };
};
