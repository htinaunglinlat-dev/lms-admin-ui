import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProofImage } from "@/types/order";

import { ZoomedImage } from "../elements/zoomed-image";

type Props = {
  orderId: number;
  proofImages?: ProofImage[];
};

export function ProofImagesCard({ orderId, proofImages }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proof Images</CardTitle>
        <CardDescription>
          Submitted payment proof and references.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {proofImages?.length ? (
          <div className="space-y-4">
            {proofImages.map((proof) => (
              <div key={proof.id}>
                <ZoomedImage
                  src={proof.url}
                  alt={`Order ${orderId} payment proof ${proof.id}`}
                  className="aspect-video w-full object-contain rounded-md border"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-md border px-4 py-8 text-center text-sm text-muted-foreground">
            No proof images submitted.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
