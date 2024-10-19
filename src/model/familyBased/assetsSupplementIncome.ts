export interface AssetsSupplementIncome {
  // Your Assets (Optional)
  // 270 - Enter the balance of all savings and checking accounts
  balanceSavingsCheckingAccounts: string;

  // 271 - Enter the net cash value of real-estate holdings (Net value = assessed value - mortgage
  // debt)
  netRealEstateHoldings: string;

  // 275 - Enter the net cash value of all stocks, bonds, certificates of deposit, and other
  // assets
  netStocksBondsAssets: string;

  // 272 - Add together Item Numbers 1 - 3 and enter the total here
  totalAssets: string;

  // Assets from Form I-864A, Part 4, Item Number 3.d, for:
  // 273 - Name of Relative
  nameOfRelative: string;

  // 274 - Your household member's assets from Form I-864A (optional)
  householdMemberAssets: string;

  // Assets of the principal sponsored immigrant (optional)
  // 276 - Balance of the principal immigrant's savings and checking accounts
  principalImmigrantSavingsCheckingBalance: string;

  // 279 - Net cash value of all the principal immigrant's real estate holdings
  principalImmigrantRealEstateHoldings: string;

  // 280 - Current cash value of the principal immigrant's stocks, bonds, and other assets
  principalImmigrantStocksBondsAssets: string;

  // 281 - Add together Item Numbers 6 - 8 and enter the number here
  totalPrincipalImmigrantAssets: string;

  // Total Value of Assets
  // 282 - Add together Item Numbers 4, 5.b, and 9 and enter the total here
  totalValueOfAssets: string;
}
