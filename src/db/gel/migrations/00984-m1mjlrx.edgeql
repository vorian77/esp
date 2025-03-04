CREATE MIGRATION m1mjlrxwx4wtkwaarchnvf5h2rhhhnksekxhlojk5brmdvmpowrnpa
    ONTO m1fysneorcu2nh552m7w2wkgjszffptkrht6oq6siupbdndbyoiknq
{
  CREATE FUNCTION sys_core::attrAdd(objOwnerName: std::str) ->  std::str USING (SELECT
      objOwnerName
  );
};
