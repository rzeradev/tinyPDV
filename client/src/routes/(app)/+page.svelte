<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
</script>

<!-- Hero title -->
<div class="container mx-auto">
    <h1 class="text-4xl font-bold">Page</h1>
    <p class="text-lg">This is a page</p>
</div>

<!-- tailwind grid 12 column responsive -->
<div class="container mx-auto grid grid-cols-12 gap-4">

    <div class="col-span-12 md:col-span-4">
        <Card.Root>
            <Card.Header>
              <Card.Title>Adicionar produto</Card.Title>
              <Card.Description>Descrição</Card.Description>
            </Card.Header>

            <Card.Content class="max-h-72 flex justify-center">
            </Card.Content>

            <Card.Footer>
                <Button class="w-full pt-2 my-2 mx-4">Acessar</Button>
            </Card.Footer>
          </Card.Root>
    </div>
</div>