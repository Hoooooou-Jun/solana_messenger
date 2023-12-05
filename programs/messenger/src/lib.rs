use anchor_lang::prelude::*;

declare_id!("CeJMhcoHmBUKuKVVL34qU7UCVe8QH1KTFUMivCANTEbA");

#[program]
pub mod messenger {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: String) -> ProgramResult {
        
    }

    pub fn update(ctx: Context<Update>, data: String) -> ProgramResult {
        
    }
}

#[derive(Accounts)]
pub struct Initialize {}
