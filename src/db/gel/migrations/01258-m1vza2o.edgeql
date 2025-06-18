CREATE MIGRATION m1vza2or23cllfcztdgrko6mn72ktizi6jatn3f7tzugvwhd2rjqfq
    ONTO m1goqusda2qdmur2u5oavvn5angdpdaftg2refzlyvg6wg6mwwt4aq
{
  ALTER TYPE sys_core::SysNodeObj {
      DROP PROPERTY isDynamicChildrenSystemParents;
  };
};
