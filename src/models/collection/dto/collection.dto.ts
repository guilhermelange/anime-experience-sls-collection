import { ApiProperty } from '@nestjs/swagger/dist';

export class ResponseCollectionDto {
  @ApiProperty({ description: 'Id da Coleção' })
  id: string;

  @ApiProperty({ description: 'Nome da Coleção' })
  name: string;

  @ApiProperty({ type: () => [AnimeDto], description: 'Animes vinculados' })
  animes: AnimeDto[];
}

class AnimeDto {
  @ApiProperty({ description: 'Id do Anime' })
  id: string;

  @ApiProperty({ description: 'Nome do Anime' })
  name: string;

  @ApiProperty({ description: 'Descrição do Anime' })
  description: string;

  @ApiProperty({ description: 'Imagem do Anime' })
  image_file: string;

  @ApiProperty({ description: 'Cover imagem do Anime' })
  cover_file: string;

  @ApiProperty({ description: 'Ano de lançamento do Anime' })
  start_year: number;

  @ApiProperty({ description: 'Quantidade de temporadas do Anime' })
  season_count: number;

  @ApiProperty({ description: 'Média de aprovação do Anime' })
  evaluation_media: number;

  @ApiProperty({ description: 'Aprovação do Anime para o usuário' })
  evaluation: boolean;

  @ApiProperty({ description: 'Favoritado?' })
  favorite: boolean;
}

export enum CollectionFilter {
  animes = 'animes',
  playlist = 'playlist',
}
