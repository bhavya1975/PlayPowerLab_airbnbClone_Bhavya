import { IFilterStrategy, Listing, FilterState } from '@/types';

export class FilterEngine {
  private strategies: IFilterStrategy[] = [];

  constructor(strategies: IFilterStrategy[] = []) {
    this.strategies = strategies;
  }

  public addStrategy(strategy: IFilterStrategy): this {
    this.strategies.push(strategy);
    return this;
  }

  public removeStrategy(id: string): this {
    this.strategies = this.strategies.filter(s => s.id !== id);
    return this;
  }

  public execute(listings: Listing[], state: FilterState): Listing[] {
    return this.strategies.reduce((currentListings, strategy) => {
      return strategy.apply(currentListings, state);
    }, listings);
  }
}
