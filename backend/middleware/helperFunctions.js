const MAX_REL_VALUE = 5;

const setUpCharacterList = (characterList) => {
  if (!characterList) {
    return [];
  }

  return characterList.split(" ");
};

const truncateRelationType = (relationType) => {
  if (!relationType) {
    return 0;
  }

  return Math.max(0, Math.min(relationType, MAX_REL_VALUE));
};

module.exports = { setUpCharacterList, truncateRelationType };
